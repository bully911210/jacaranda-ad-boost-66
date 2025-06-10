
import { Button } from "@/components/ui/button";

const LeadCaptureSection = () => {
  const scrollToCalendly = () => {
    const calendlyWidget = document.querySelector('.calendly-inline-widget');
    if (calendlyWidget) {
      calendlyWidget.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calendly-section" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gray-900 mb-6">
              Ready to Engineer Your Sales Pipeline?
            </h2>
            <p className="font-open-sans text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Book a strategy call with our Meta Ads and automation experts. 
              Let's discuss how to turn your ad spend into a lead-generating machine.
            </p>
          </div>
          
          {/* Updated Calendly Embed */}
          <div className="max-w-3xl mx-auto mb-8">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/badenhorst-franz/meta-ads-strategy-call?primary_color=f675f6" 
              style={{minWidth: '320px', minHeight: '800px', height: '100vh'}}
            ></div>
          </div>
          
          {/* Fallback CTA Button */}
          <div className="text-center">
            <Button 
              onClick={scrollToCalendly}
              className="bg-jacaranda hover:bg-jacaranda-700 text-white font-open-sans font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Book a Call with the Expert
            </Button>
            
            <div className="mt-8 font-open-sans text-sm text-gray-500 italic">
              Because speed closes deals - and we make speed happen.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
