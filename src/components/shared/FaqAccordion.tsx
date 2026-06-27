'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { faqItems } from '@/config/faq';
import { ChevronDown } from 'lucide-react';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqItems.map((faq, index) => (
        <Card key={index} padding="none">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <span className="font-medium pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
