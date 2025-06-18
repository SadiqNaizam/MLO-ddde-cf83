import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion for tab content animation

// Custom Components
import LuxurySiteHeader from '@/components/layout/LuxurySiteHeader';
import LuxurySiteFooter from '@/components/layout/LuxurySiteFooter';
import CinematicPageTransitionHandler from '@/components/CinematicPageTransitionHandler';
import AnimatedCTAButton from '@/components/AnimatedCTAButton';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast'; // For toast notifications
import { ArrowRight, ArrowLeft, ShoppingBag, Truck, CreditCard } from 'lucide-react';

// Placeholder garment data
const garmentDetails = {
  name: "Bespoke Silk Shirt",
  fabric: "Italian Cream Silk",
  collar: "Cutaway Collar",
  cuffs: "Double French Cuffs",
  monogram: "A.B.C (Left Cuff)",
  price: 295.00,
  imageUrl: "https://images.unsplash.com/photo-1603252109360-778ba998b3c4?q=80&w=800&auto=format&fit=crop", // Placeholder image
  size: "Custom Fit",
  quantity: 1,
};

// Zod Schemas for form validation
const shippingSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address is too short." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  stateProvince: z.string().min(2, { message: "State/Province is required." }),
  postalCode: z.string().min(3, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  phoneNumber: z.string().optional(),
});

const paymentSchema = z.object({
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Invalid card number (must be 16 digits)." }), // Simplified regex
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date (MM/YY)." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "Invalid CVV (3 or 4 digits)." }),
});

type ShippingFormData = z.infer<typeof shippingSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const OrderSummaryCheckoutPage = () => {
  console.log('OrderSummaryCheckoutPage loaded');
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("review");

  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "United States", // Default country
      phoneNumber: "",
    },
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleNextTab = (nextTabValue: string) => {
    setActiveTab(nextTabValue);
  };
  
  const handlePreviousTab = (prevTabValue: string) => {
    setActiveTab(prevTabValue);
  };

  const onShippingSubmit = (data: ShippingFormData) => {
    console.log("Shipping Data:", data);
    toast({ title: "Shipping Details Saved", description: "Proceed to payment." });
    handleNextTab("payment");
  };

  const onPaymentSubmit = (data: PaymentFormData) => {
    console.log("Payment Data:", data);
    // Here you would typically integrate with a payment gateway
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Confirmation has been sent to your email.",
      variant: "default", // Use 'default' for success, or a custom success variant
    });
    // Redirect to a success page or user dashboard
    navigate('/user-dashboard'); // Path from App.tsx
  };
  
  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200">
      <LuxurySiteHeader />
      <CinematicPageTransitionHandler pageKey={location.pathname}>
        <main className="container mx-auto py-12 px-4 flex-grow">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">Checkout</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
              Review your bespoke creation and complete your purchase.
            </p>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-neutral-200 dark:bg-neutral-700/50 p-1 rounded-lg mb-8 shadow-sm">
              <TabsTrigger value="review" className="py-3 text-sm font-medium data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Review Order
              </TabsTrigger>
              <TabsTrigger value="shipping" className="py-3 text-sm font-medium data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900 rounded-md transition-colors duration-200 flex items-center justify-center gap-2" disabled={shippingForm.formState.isSubmitSuccessful && activeTab !== 'shipping'}>
                <Truck className="h-5 w-5" /> Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" className="py-3 text-sm font-medium data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900 rounded-md transition-colors duration-200 flex items-center justify-center gap-2" disabled={!shippingForm.formState.isSubmitSuccessful || paymentForm.formState.isSubmitSuccessful}>
                <CreditCard className="h-5 w-5" /> Payment
              </TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <TabsContent value="review">
                  <Card className="shadow-xl border-neutral-200/50 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Your Bespoke Garment</CardTitle>
                      <CardDescription className="text-neutral-600 dark:text-neutral-400">Please review the details of your custom order.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <AspectRatio ratio={3 / 4} className="bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md">
                          <img src={garmentDetails.imageUrl} alt={garmentDetails.name} className="object-cover w-full h-full" />
                        </AspectRatio>
                        <div className="space-y-3 text-sm">
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">{garmentDetails.name}</h3>
                          <p><span className="font-medium text-neutral-700 dark:text-neutral-300">Fabric:</span> {garmentDetails.fabric}</p>
                          <p><span className="font-medium text-neutral-700 dark:text-neutral-300">Collar:</span> {garmentDetails.collar}</p>
                          <p><span className="font-medium text-neutral-700 dark:text-neutral-300">Cuffs:</span> {garmentDetails.cuffs}</p>
                          <p><span className="font-medium text-neutral-700 dark:text-neutral-300">Monogram:</span> {garmentDetails.monogram}</p>
                          <p><span className="font-medium text-neutral-700 dark:text-neutral-300">Size:</span> {garmentDetails.size}</p>
                          <p><span className="font-medium text-neutral-700 dark:text-neutral-300">Quantity:</span> {garmentDetails.quantity}</p>
                        </div>
                      </div>
                      <Separator className="my-4 bg-neutral-200 dark:bg-neutral-700" />
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Subtotal:</p>
                        <p className="text-xl font-bold text-neutral-900 dark:text-neutral-50">${garmentDetails.price.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Shipping and taxes calculated at next step.</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => handleNextTab("shipping")} size="lg" className="bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900">
                        Proceed to Shipping <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="shipping">
                  <Card className="shadow-xl border-neutral-200/50 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Shipping Information</CardTitle>
                      <CardDescription className="text-neutral-600 dark:text-neutral-400">Where should we send your masterpiece?</CardDescription>
                    </CardHeader>
                    <Form {...shippingForm}>
                      <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                        <CardContent className="space-y-4">
                          <FormField control={shippingForm.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., John Doe" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={shippingForm.control} name="addressLine1" render={({ field }) => (
                            <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input placeholder="e.g., 123 Luxe Avenue" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={shippingForm.control} name="addressLine2" render={({ field }) => (
                            <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input placeholder="e.g., Apartment, Suite" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={shippingForm.control} name="city" render={({ field }) => (
                              <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., New York" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={shippingForm.control} name="stateProvince" render={({ field }) => (
                              <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="e.g., NY" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={shippingForm.control} name="postalCode" render={({ field }) => (
                              <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="e.g., 10001" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={shippingForm.control} name="country" render={({ field }) => (
                              <FormItem><FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400"><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                                  <SelectContent className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600">
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    {/* Add more countries as needed */}
                                  </SelectContent>
                                </Select><FormMessage />
                              </FormItem>
                            )} />
                          </div>
                           <FormField control={shippingForm.control} name="phoneNumber" render={({ field }) => (
                            <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" placeholder="e.g., +1 555-123-4567" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                          )} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                           <Button type="button" variant="outline" onClick={() => handlePreviousTab("review")} size="lg" className="border-neutral-300 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700">
                             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Review
                           </Button>
                           <Button type="submit" size="lg" className="bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900">
                             Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                           </Button>
                        </CardFooter>
                      </form>
                    </Form>
                  </Card>
                </TabsContent>

                <TabsContent value="payment">
                  <Card className="shadow-xl border-neutral-200/50 dark:border-neutral-700/50 bg-white dark:bg-neutral-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Payment Details</CardTitle>
                      <CardDescription className="text-neutral-600 dark:text-neutral-400">Securely enter your payment information.</CardDescription>
                    </CardHeader>
                    <Form {...paymentForm}>
                      <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                        <CardContent className="space-y-4">
                          {/* Placeholder for total amount */}
                          <div className="p-4 bg-neutral-100 dark:bg-neutral-700/60 rounded-md">
                            <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Total Amount Due: ${garmentDetails.price.toFixed(2)}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">(Includes taxes and free shipping)</p>
                          </div>
                          
                          <FormField control={paymentForm.control} name="cardholderName" render={({ field }) => (
                            <FormItem><FormLabel>Cardholder Name</FormLabel><FormControl><Input placeholder="Name as it appears on card" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={paymentForm.control} name="cardNumber" render={({ field }) => (
                            <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={paymentForm.control} name="expiryDate" render={({ field }) => (
                              <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={paymentForm.control} name="cvv" render={({ field }) => (
                              <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="•••" {...field} className="bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-neutral-500 dark:focus:border-neutral-400" /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                           <FormDescription className="text-xs text-neutral-500 dark:text-neutral-400">
                            Your payment is processed securely. We do not store your card details.
                          </FormDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Button type="button" variant="outline" onClick={() => handlePreviousTab("shipping")} size="lg" className="border-neutral-300 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipping
                          </Button>
                          <AnimatedCTAButton type="submit" className="font-semibold" disabled={paymentForm.formState.isSubmitting}>
                            {paymentForm.formState.isSubmitting ? "Processing..." : `Place Order & Pay $${garmentDetails.price.toFixed(2)}`}
                          </AnimatedCTAButton>
                        </CardFooter>
                      </form>
                    </Form>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </CinematicPageTransitionHandler>
      <LuxurySiteFooter />
    </div>
  );
};

export default OrderSummaryCheckoutPage;