import { Link } from 'react-router-dom';

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs text-muted-foreground mb-12">
          <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Mentions légales</span>
        </nav>

        <div className="prose prose-slate max-w-none space-y-16">
          {/* Titre */}
          <section>
            <h1 className="font-heading text-3xl font-bold mb-4">Mentions légales</h1>
            <p className="text-muted-foreground font-mono text-sm">Dernière mise à jour : juin 2026</p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Propriété intellectuelle &amp; Droit d&apos;auteur</h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>Les illustrations, dessins et créations visuelles diffusés sous le nom Pancartiviste sont des œuvres originales protégées par le droit d&apos;auteur. Ces œuvres sont placées sous la gestion de l&apos;<strong>ADAGP</strong> (Société des Auteurs dans les Arts Graphiques et Plastiques).</p>
              <p>Toute reproduction, représentation, modification ou diffusion, totale ou partielle, des œuvres sans autorisation préalable est interdite, conformément aux dispositions du Code de la propriété intellectuelle.</p>
              <p><strong>Usage autorisé :</strong> Les illustrations peuvent être utilisées librement dans un cadre strictement personnel, non commercial et non lucratif, sous réserve du respect de l&apos;intégrité des œuvres et de la mention du nom Pancartiviste.</p>
              <p><strong>Usage interdit :</strong> Toute utilisation à des fins professionnelles, commerciales, promotionnelles ou publicitaires est strictement interdite sans autorisation écrite préalable.</p>
              <p>De même, toute utilisation des œuvres dans un contexte visant à promouvoir, justifier ou encourager la haine, la discrimination ou la violence envers des individus ou des groupes est formellement prohibée. De tels usages feront l&apos;objet de poursuites judiciaires.</p>
              <p>Pour toute demande d&apos;autorisation ou de collaboration, merci de prendre contact avec l&apos;auteur.</p>
              <p className="text-muted-foreground">© Pancartiviste – Tous droits réservés</p>
            </div>
          </section>

          {/* Éditeur du site */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Éditeur du site</h2>
            <div className="space-y-2 text-sm leading-relaxed">
              <p>Le site Pancartiviste Shop est une boutique en ligne exploitée par l&apos;artiste <strong>Zeu Hi</strong>.</p>
              <ul className="list-none space-y-1 pl-0">
                <li><strong>Nom commercial :</strong> Pancartiviste Shop</li>
                <li><strong>Responsable de publication :</strong> Zeu Hi</li>
                <li><strong>Statut :</strong> artiste-auteur, plasticienne</li>
                <li><strong>Adresse :</strong> Maison Dani, 380 Impasse de Réquiston, 06380 Sospel, France</li>
                <li><strong>Email :</strong> <a href="mailto:zeuhi@pancartiviste.com" className="text-primary hover:underline">zeuhi@pancartiviste.com</a></li>
              </ul>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Hébergement</h2>
            <p className="text-sm leading-relaxed">Le site est hébergé par <strong>Base44</strong> et <strong>Ionos</strong>.</p>
          </section>

          {/* Activité */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Activité</h2>
            <p className="text-sm leading-relaxed">Pancartiviste Shop est une boutique en ligne proposant des produits illustrés à partir des créations originales de l&apos;artiste Zeu Hi. Les produits sont fabriqués à la demande et expédiés par notre partenaire <strong>Gelato</strong>.</p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Données personnelles</h2>
            <p className="text-sm leading-relaxed">Les informations collectées sur ce site sont utilisées uniquement dans le cadre de la relation commerciale (commandes, livraison, service client). Conformément à la réglementation applicable en matière de protection des données, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles.</p>
            <p className="text-sm leading-relaxed mt-2">Pour exercer ces droits, vous pouvez nous contacter à : <a href="mailto:zeuhi@pancartiviste.com" className="text-primary hover:underline">zeuhi@pancartiviste.com</a></p>
          </section>

          {/* Politique de confidentialité */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Politique de confidentialité</h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>Pancartiviste Shop collecte et traite vos données personnelles dans les catégories suivantes : coordonnées, informations financières, informations du compte, informations de transaction, communications, informations sur l&apos;appareil et informations d&apos;utilisation.</p>
              <p>Ces données peuvent être collectées directement auprès de vous, automatiquement via les Services, ou auprès de nos prestataires et partenaires. Elles sont utilisées pour fournir et améliorer les Services, à des fins de marketing, de sécurité, de communication et pour respecter nos obligations légales.</p>
              <p>Les Services sont hébergés par Shopify, qui collecte et traite des informations personnelles. Pour en savoir plus sur l&apos;utilisation par Shopify de vos données, consultez la Politique de confidentialité de Shopify.</p>
              <p><strong>Vos droits :</strong> Selon votre lieu de résidence, vous pouvez disposer de droits d&apos;accès, d&apos;effacement, de rectification, à la portabilité, et d&apos;opposition au traitement. Pour exercer ces droits : <a href="mailto:zeuhi@pancartiviste.com" className="text-primary hover:underline">zeuhi@pancartiviste.com</a></p>
              <p>Les Services ne sont pas destinés aux enfants. Nous ne collectons sciemment aucune information personnelle concernant des mineurs.</p>
            </div>
          </section>

          {/* CGV */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Conditions Générales de Vente (CGV)</h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>Les présentes CGV régissent les ventes conclues sur le site Pancartiviste Shop.</p>

              <div>
                <h3 className="font-semibold mb-1">1. Produits</h3>
                <p>Chaque produit est fabriqué à la demande et expédié par notre partenaire Gelato. Les visuels peuvent présenter de légères variations.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">2. Prix</h3>
                <p>Indiqués en euros (€) TTC. Les frais de livraison sont affichés à la validation. Les prix peuvent être modifiés à tout moment.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">3. Commande</h3>
                <p>Toute commande implique l&apos;acceptation des présentes CGV. Nous nous réservons le droit de refuser ou d&apos;annuler toute commande suspecte.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">4. Paiement</h3>
                <p>Exigible immédiatement à la commande, sécurisé via Stripe.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">5. Livraison</h3>
                <p>Les délais sont indicatifs. Zeu Hi ne saurait être tenue responsable des retards imputables aux transporteurs.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">6. Droit de rétractation</h3>
                <p>Conformément à la législation, le droit de rétractation ne s&apos;applique pas aux produits personnalisés ou fabriqués à la demande.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">7. Propriété intellectuelle</h3>
                <p>Les créations restent la propriété exclusive de Zeu Hi, protégées par l&apos;ADAGP. Toute reproduction sans autorisation est interdite.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">8. Droit applicable</h3>
                <p>Les présentes CGV sont régies par le droit français.</p>
              </div>
            </div>
          </section>

          {/* Retours et remboursements */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Politique de retour et de remboursement</h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>Chaque produit étant fabriqué à la demande, nous n&apos;acceptons pas les retours ou échanges pour erreurs de taille ou changements d&apos;avis après commande.</p>
              <p><strong>Produits défectueux ou erreurs :</strong> Contactez-nous dans un délai de 14 jours après réception avec une photo du problème et votre numéro de commande. Nous proposerons un remplacement gratuit ou un remboursement complet.</p>
              <p><strong>Commandes non reçues :</strong> Vérifiez le suivi de livraison, puis contactez-nous. Nous ouvrirons une enquête avec Gelato.</p>
              <p><strong>Délai de remboursement :</strong> 5 à 10 jours ouvrés via le mode de paiement initial.</p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Responsabilité</h2>
            <p className="text-sm leading-relaxed">Zeu Hi ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.</p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Droit applicable</h2>
            <p className="text-sm leading-relaxed">Les présentes mentions légales sont régies par le droit français.</p>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-12">
            <h2 className="font-heading text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-1 text-sm leading-relaxed">
              <p><strong>Email :</strong> <a href="mailto:zeuhi@pancartiviste.com" className="text-primary hover:underline">zeuhi@pancartiviste.com</a></p>
              <p><strong>Artiste :</strong> Zeu Hi</p>
              <p><strong>Adresse :</strong> Maison Dani 380, Impasse de Réquiston, 06380 Sospel, France</p>
              <p className="text-muted-foreground mt-2">Zeu Hi est humaine mais répond toujours dans les 24–48 heures, en jours ouvrés.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}