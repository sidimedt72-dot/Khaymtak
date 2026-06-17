function ShipReturns() {
  return (
    <div className="text-sm text-muted-foreground space-y-3">
      <p>
        <strong className="text-foreground">Livraison :</strong> Livraison et
        installation sur site incluses pour toute commande supérieure à 500€.
        Des frais supplémentaires peuvent s&apos;appliquer pour les zones
        éloignées.
      </p>
      <p>
        <strong className="text-foreground">Retour :</strong> Le matériel est
        récupéré à la fin de votre événement. Vérifiez l&apos;état du matériel
        lors de la livraison et signalez tout dommage préexistant.
      </p>
      <p>
        <strong className="text-foreground">Caution :</strong> Une caution peut
        être demandée selon le matériel loué. Elle vous est restituée après
        vérification du retour.
      </p>
    </div>
  );
}

export default ShipReturns;
