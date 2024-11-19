import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      "question": "Comment fonctionne la loterie ?",
      "answer": "Notre loterie utilise des contrats intelligents sur la blockchain pour garantir une transparence et une équité totales. Achetez des tickets, et le contrat intelligent s'occupe automatiquement de la sélection aléatoire des gagnants."
    },
    {
      "question": "Comment les gagnants sont-ils sélectionnés ?",
      "answer": "Les gagnants sont sélectionnés à l'aide d'une fonction aléatoire vérifiable, garantissant que le processus de sélection est véritablement aléatoire et ne peut pas être manipulé."
    },
    {
      "question": "Quand recevrai-je mes gains ?",
      "answer": "Les gains sont automatiquement transférés dans votre portefeuille immédiatement après le tirage, grâce à notre technologie de contrat intelligent. Pas besoin de réclamations manuelles !"
    },    
  ];

  return (
    <section className="max-w-4xl mx-auto my-20" id="faq">
      <h2 className="text-3xl font-bold mb-8 text-center" >Questions Fréquemment Posées</h2>
      
      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white/10 backdrop-blur-lg rounded-lg p-4 cursor-pointer"
          >
            <summary className="flex items-center gap-4 font-semibold">
              <HelpCircle className="w-6 h-6 text-pink-500" />
              {faq.question}
            </summary>
            <p className="mt-4 text-gray-300 pl-10">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}