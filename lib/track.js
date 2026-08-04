const DEBUG = process.env.NODE_ENV !== 'production';

function genEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const META_STANDARD = {
  Lead: 'Lead',
  Contact: 'Contact',
  SubmitForm: 'Lead',
  BookConsultation: 'Schedule',
  ViewContent: 'ViewContent',
  PortfolioView: 'ViewContent',
};

export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  const eventId = params.eventId || genEventId();

  if (DEBUG) console.log(`%c[track] ${event}`, 'color:#EE6A52;font-weight:bold', { eventId, ...params });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, event_id: eventId, ...params });

  if (window.fbq) {
    const metaName = META_STANDARD[event];
    if (metaName) {
      window.fbq('track', metaName, { content_name: params.label || event, ...params }, { eventID: eventId });
    } else {
      window.fbq('trackCustom', event, params, { eventID: eventId });
    }
  }

  const CAPI_EVENTS = ['Lead', 'Contact', 'SubmitForm', 'BookConsultation'];
  if (CAPI_EVENTS.includes(event)) {
    fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: META_STANDARD[event] || event, eventId, eventSourceUrl: window.location.href, params }),
      keepalive: true,
    }).catch(() => {});
  }

  return eventId;
}

export const trackLead = (p) => track('Lead', p);
export const trackContact = (p) => track('Contact', p);
export const trackFormSubmit = (p) => track('SubmitForm', p);
export const trackConsultation = (p) => track('BookConsultation', p);
export const trackWhatsApp = (p) => track('WhatsAppClick', p);
export const trackPhone = (p) => track('PhoneClick', p);
export const trackEmail = (p) => track('EmailClick', p);
export const trackPortfolioView = (p) => track('PortfolioView', p);