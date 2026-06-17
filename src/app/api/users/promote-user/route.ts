import { PromoteAdminSchema, promoteAdminSchema } from "@/features/users";
import { getCurrentUser, isAdmin } from "@/features/users/actions";
import { getAuthUserById, promoteUserToAdmin } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!isAdmin(currentUser)) {
    return NextResponse.json(
      { message: "Only Admin allowed to do this action." },
      { status: 403 },
    );
  }

  const data: PromoteAdminSchema = await request.json();
  const validate = promoteAdminSchema.safeParse(data);

  if (!validate.success) {
    return NextResponse.json(
      { message: "Error, Data validation failed." },
      { status: 400 },
    );
  }

  const userResponse = await getAuthUserById(data.userId);

  if (!userResponse?.user) {
    return NextResponse.json(
      { message: `Error, UserId: ${data.userId} not found.` },
      { status: 404 },
    );
  }

  const updated = await promoteUserToAdmin(data.userId);

  if (!updated) {
    return NextResponse.json(
      { message: "Unable to promote user." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: `User ${userResponse.user.email ?? updated.email} is promoted to Admin.`,
    },
    { status: 201 },
  );
}
