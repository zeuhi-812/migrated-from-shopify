import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderConfirmed() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="font-heading font-black uppercase text-4xl text-primary mb-4">
        Commande confirmée !
      </h1>
      <p className="text-muted-foreground mb-2">
        Merci pour votre commande. Vous allez recevoir un email de confirmation.
      </p>
      <p className="text-muted-foreground text-sm mb-8">
        Votre commande est transmise à Gelato pour impression et expédition.
      </p>
      <Link to="/boutique">
        <Button size="lg" className="font-semibold">
          Continuer mes achats
        </Button>
      </Link>
    </div>
  );
}