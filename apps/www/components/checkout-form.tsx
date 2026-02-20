'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useCheckout } from '@/hooks/use-checkout';
import { CheckoutPayload, ShippingAddress, Cart } from '@/types';
import { Button } from './ui/button';
import { OrderSummary } from './order-summary';
import { HttpError } from '@/lib/api';

interface CheckoutFormProps {
    cart: Cart;
}

type FormErrors = Partial<Record<keyof ShippingAddress | 'payment_method' | 'root', string>>;

const PAYMENT_METHODS = [
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'card', label: 'Credit / Debit Card' },
    { value: 'wallet', label: 'Digital Wallet' },
] as const;

type PaymentMethod = CheckoutPayload['payment_method'];

const GOVERNORATES = [
    'Cairo', 'Giza', 'Alexandria', 'Qalyubia', 'Dakahlia', 'Sharqia',
    'Gharbia', 'Monufia', 'Beheira', 'Kafr El Sheikh', 'Damietta',
    'Port Said', 'Ismailia', 'Suez', 'Sinai (North)', 'Sinai (South)',
    'Matrouh', 'Faiyum', 'Beni Suef', 'Minya', 'Asyut', 'Sohag',
    'Qena', 'Luxor', 'Aswan', 'Red Sea', 'New Valley',
];

function validate(address: ShippingAddress, paymentMethod: string): FormErrors {
    const errors: FormErrors = {};
    if (!address.first_name.trim()) errors.first_name = 'First name is required.';
    if (!address.last_name.trim()) errors.last_name = 'Last name is required.';
    if (!address.email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) errors.email = 'Enter a valid email.';
    if (!address.phone.trim()) errors.phone = 'Phone number is required.';
    else if (!/^(\+20|0)?1[0125][0-9]{8}$/.test(address.phone.replace(/\s/g, ''))) {
        errors.phone = 'Enter a valid Egyptian phone number.';
    }
    if (!address.address_line_1.trim()) errors.address_line_1 = 'Address is required.';
    if (!address.city.trim()) errors.city = 'City is required.';
    if (!address.governorate.trim()) errors.governorate = 'Governorate is required.';
    if (!paymentMethod) errors.payment_method = 'Please select a payment method.';
    return errors;
}

const initialAddress: ShippingAddress = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    governorate: '',
    postal_code: '',
};

export function CheckoutForm({ cart }: CheckoutFormProps) {
    const router = useRouter();
    const checkout = useCheckout();

    const [address, setAddress] = useState<ShippingAddress>(initialAddress);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());

    const updateField = <K extends keyof ShippingAddress>(key: K, value: ShippingAddress[K]) => {
        setAddress((prev) => ({ ...prev, [key]: value }));
        if (touched.has(key)) {
            const newErrors = validate({ ...address, [key]: value }, paymentMethod);
            setErrors((prev) => ({ ...prev, [key]: newErrors[key] }));
        }
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => new Set(prev).add(field));
        const newErrors = validate(address, paymentMethod);
        setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
    };

    const handleSubmit = async () => {
        const allErrors = validate(address, paymentMethod);
        setErrors(allErrors);
        setTouched(new Set(Object.keys(initialAddress)));

        if (Object.keys(allErrors).length > 0) return;

        checkout.mutate(
            {
                shipping_address: address,
                payment_method: paymentMethod,
                notes: notes.trim() || undefined,
            },
            {
                onSuccess: (order) => {
                    router.push(`/orders/${order.id}/confirmation`);
                },
                onError: (error) => {
                    if (error instanceof HttpError && error.errors) {
                        const apiErrors: FormErrors = {};
                        Object.entries(error.errors).forEach(([key, messages]) => {
                            const field = key.replace('shipping_address.', '') as keyof FormErrors;
                            apiErrors[field] = messages[0];
                        });
                        setErrors(apiErrors);
                    } else {
                        setErrors({ root: error.message });
                    }
                },
            }
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-3 space-y-10">
                {/* Shipping Address */}
                <section>
                    <h2 className="text-base font-medium tracking-wide mb-6">Shipping Address</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FieldGroup
                                label="First Name"
                                error={errors.first_name}
                                required
                            >
                                <input
                                    type="text"
                                    value={address.first_name}
                                    onChange={(e) => updateField('first_name', e.target.value)}
                                    onBlur={() => handleBlur('first_name')}
                                    placeholder="Ahmed"
                                    className={inputClass(!!errors.first_name)}
                                />
                            </FieldGroup>
                            <FieldGroup
                                label="Last Name"
                                error={errors.last_name}
                                required
                            >
                                <input
                                    type="text"
                                    value={address.last_name}
                                    onChange={(e) => updateField('last_name', e.target.value)}
                                    onBlur={() => handleBlur('last_name')}
                                    placeholder="Hassan"
                                    className={inputClass(!!errors.last_name)}
                                />
                            </FieldGroup>
                        </div>

                        <FieldGroup label="Email Address" error={errors.email} required>
                            <input
                                type="email"
                                value={address.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                placeholder="ahmed@example.com"
                                className={inputClass(!!errors.email)}
                            />
                        </FieldGroup>

                        <FieldGroup label="Phone Number" error={errors.phone} required>
                            <input
                                type="tel"
                                value={address.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                onBlur={() => handleBlur('phone')}
                                placeholder="01012345678"
                                className={inputClass(!!errors.phone)}
                            />
                        </FieldGroup>

                        <FieldGroup label="Address Line 1" error={errors.address_line_1} required>
                            <input
                                type="text"
                                value={address.address_line_1}
                                onChange={(e) => updateField('address_line_1', e.target.value)}
                                onBlur={() => handleBlur('address_line_1')}
                                placeholder="123 El Tahrir Square"
                                className={inputClass(!!errors.address_line_1)}
                            />
                        </FieldGroup>

                        <FieldGroup label="Address Line 2 (Optional)" error={undefined}>
                            <input
                                type="text"
                                value={address.address_line_2 ?? ''}
                                onChange={(e) => updateField('address_line_2', e.target.value)}
                                placeholder="Apartment, floor, etc."
                                className={inputClass(false)}
                            />
                        </FieldGroup>

                        <div className="grid grid-cols-2 gap-4">
                            <FieldGroup label="City" error={errors.city} required>
                                <input
                                    type="text"
                                    value={address.city}
                                    onChange={(e) => updateField('city', e.target.value)}
                                    onBlur={() => handleBlur('city')}
                                    placeholder="Cairo"
                                    className={inputClass(!!errors.city)}
                                />
                            </FieldGroup>
                            <FieldGroup label="Governorate" error={errors.governorate} required>
                                <select
                                    value={address.governorate}
                                    onChange={(e) => updateField('governorate', e.target.value)}
                                    onBlur={() => handleBlur('governorate')}
                                    className={inputClass(!!errors.governorate)}
                                >
                                    <option value="">Select</option>
                                    {GOVERNORATES.map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </FieldGroup>
                        </div>

                        <FieldGroup label="Postal Code (Optional)" error={undefined}>
                            <input
                                type="text"
                                value={address.postal_code ?? ''}
                                onChange={(e) => updateField('postal_code', e.target.value)}
                                placeholder="12345"
                                className={inputClass(false)}
                            />
                        </FieldGroup>
                    </div>
                </section>

                {/* Payment Method */}
                <section>
                    <h2 className="text-base font-medium tracking-wide mb-6">Payment Method</h2>
                    <div className="space-y-3">
                        {PAYMENT_METHODS.map((method) => (
                            <label
                                key={method.value}
                                className={`flex items-center gap-4 border p-4 rounded-sm cursor-pointer transition-colors ${paymentMethod === method.value
                                        ? 'border-neutral-900 bg-neutral-50'
                                        : 'border-neutral-200 hover:border-neutral-400'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value={method.value}
                                    checked={paymentMethod === method.value}
                                    onChange={() => setPaymentMethod(method.value)}
                                    className="accent-neutral-900"
                                />
                                <span className="text-sm tracking-wide">{method.label}</span>
                            </label>
                        ))}
                        {errors.payment_method && (
                            <p className="text-xs text-red-500">{errors.payment_method}</p>
                        )}
                    </div>
                </section>

                {/* Order Notes */}
                <section>
                    <h2 className="text-base font-medium tracking-wide mb-4">Order Notes (Optional)</h2>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special instructions for your order..."
                        rows={3}
                        className="w-full border border-neutral-300 px-4 py-3 text-sm font-light focus:outline-none focus:border-neutral-900 rounded-sm resize-none transition-colors"
                    />
                </section>
            </div>

            {/* Right: Order Summary & CTA */}
            <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-6">
                    <div className="border border-neutral-200 rounded-sm p-6">
                        <OrderSummary cart={cart} />
                    </div>

                    {errors.root && (
                        <p className="text-sm text-red-500 text-center">{errors.root}</p>
                    )}

                    <Button
                        variant="default"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={checkout.isPending}
                        className="w-full text-sm tracking-widest"
                    >
                        {checkout.isPending ? 'Placing Order...' : 'Place Order'}
                    </Button>

                    <p className="text-xs text-center text-neutral-400 leading-relaxed">
                        By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}

interface FieldGroupProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

function FieldGroup({ label, error, required, children }: FieldGroupProps) {
    return (
        <div className="space-y-1">
            <label className="block text-xs tracking-widest text-neutral-500 uppercase">
                {label}
                {required && <span className="text-neutral-400 ml-1">*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

function inputClass(hasError: boolean): string {
    return `w-full border px-4 py-3 text-sm font-light focus:outline-none rounded-sm transition-colors ${hasError
            ? 'border-red-400 focus:border-red-500'
            : 'border-neutral-300 focus:border-neutral-900'
        }`;
}