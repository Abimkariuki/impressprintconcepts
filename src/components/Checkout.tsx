import { useState } from 'react';

type Step = 0 | 1 | 2 | 3;

export default function Checkout({ onBackToCart }: { onBackToCart?: () => void }) {
  const [step, setStep] = useState<Step>(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [shipping, setShipping] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<'mpesa' | 'card' | 'cash'>('mpesa');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = ['Details', 'Shipping', 'Payment', 'Review'];

  const validateStep = (s: Step) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
      if (!/^\+?\d{9,15}$/.test(phone)) e.phone = 'Enter a valid phone (e.g., +254...)';
    }
    if (s === 1) {
      if (shipping === 'delivery' && address.trim().length < 6) e.address = 'Provide a delivery address';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, (s + 1) as Step));
  };
  const back = () => setStep((s) => Math.max(0, (s - 1) as Step));
  
  // simple AB metric hooks
  try { if (step === 0) localStorage.setItem('checkout_started', '1'); } catch {}

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-heading font-bold text-brown-900">Checkout</h1>
          {onBackToCart && (
            <button onClick={onBackToCart} className="text-brown-700 hover:text-brown-900">← Back to Cart</button>
          )}
        </div>
        <div className="flex items-center gap-2 mb-8" aria-label="Progress">
          {steps.map((label, idx) => (
            <div key={label} className={`flex-1 h-2 rounded-full ${idx <= step ? 'bg-yellow-500' : 'bg-yellow-200'}`} aria-hidden="true" />
          ))}
        </div>

        {step === 0 && (
          <section aria-label="Details" className="bg-white rounded-2xl p-6 border-2 border-yellow-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brown-800">Name (optional)</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-800">Email</label>
                <input aria-invalid={!!errors.email} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500" />
                {errors.email && <p className="text-red-600 text-xs mt-1" role="alert">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-800">Phone</label>
                <input aria-invalid={!!errors.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500" />
                {errors.phone && <p className="text-red-600 text-xs mt-1" role="alert">{errors.phone}</p>}
              </div>
            </div>
            <p className="text-sm text-brown-600">Guest checkout: we only need email or phone to send order updates.</p>
          </section>
        )}

        {step === 1 && (
          <section aria-label="Shipping" className="bg-white rounded-2xl p-6 border-2 border-yellow-200 space-y-4">
            <div className="flex gap-3" role="radiogroup" aria-label="Delivery method">
              {['pickup','delivery'].map((opt) => (
                <button key={opt} onClick={() => setShipping(opt as any)} className={`min-h-12 px-4 py-3 rounded-full border-2 ${shipping===opt?'border-brown-700 bg-yellow-50':'border-yellow-300'} focus:ring-2 focus:ring-brown-500`}>{opt}</button>
              ))}
            </div>
            {shipping === 'delivery' && (
              <div>
                <label className="block text-sm font-medium text-brown-800">Address</label>
                <input aria-invalid={!!errors.address} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500" />
                {errors.address && <p className="text-red-600 text-xs mt-1" role="alert">{errors.address}</p>}
              </div>
            )}
          </section>
        )}

        {step === 2 && (
          <section aria-label="Payment" className="bg-white rounded-2xl p-6 border-2 border-yellow-200 space-y-4">
            <div className="flex gap-3" role="radiogroup" aria-label="Payment method">
              {['mpesa','card','cash'].map((opt) => (
                <button key={opt} onClick={() => setPayment(opt as any)} className={`min-h-12 px-4 py-3 rounded-full border-2 ${payment===opt?'border-brown-700 bg-yellow-50':'border-yellow-300'} focus:ring-2 focus:ring-brown-500`}>{opt}</button>
              ))}
            </div>
            <p className="text-sm text-brown-600">Payment collection is handled securely during order confirmation.</p>
          </section>
        )}

        {step === 3 && (
          <section aria-label="Review" className="bg-white rounded-2xl p-6 border-2 border-yellow-200 space-y-2">
            <div className="text-brown-900 font-semibold">Review your details</div>
            <div className="text-sm text-brown-700">Email: {email || '—'}</div>
            <div className="text-sm text-brown-700">Phone: {phone || '—'}</div>
            <div className="text-sm text-brown-700">Delivery: {shipping}</div>
            {shipping==='delivery' && <div className="text-sm text-brown-700">Address: {address || '—'}</div>}
            <div className="text-sm text-brown-700">Payment: {payment}</div>
          </section>
        )}

        <div className="sticky bottom-4 mt-6 bg-white/90 backdrop-blur rounded-full p-2 flex gap-2 justify-between">
          <button onClick={back} disabled={step===0} className="px-5 py-3 rounded-full border-2 border-yellow-300 text-brown-900 disabled:opacity-50">Back</button>
          {step < 3 ? (
            <button onClick={next} className="px-6 py-3 rounded-full bg-brown-900 text-yellow-500 font-heading font-semibold hover:bg-brown-800">Next</button>
          ) : (
            <button className="px-6 py-3 rounded-full bg-green-600 text-white font-heading font-semibold">Place Order</button>
          )}
        </div>
      </div>
    </div>
  );
}
