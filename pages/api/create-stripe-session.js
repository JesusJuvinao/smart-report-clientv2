const stripe = require('stripe')('sk_test_51Ja2zYI8lb3K90427bEmBf22IPXO9c69eT6bsAvzUWg6cjQOoEjs1aRmF8EWDYGyhVcGipppbRFtUCPunbOpHyt100VaaNw6ER');

async function CreateStripeSession(req, res) {
    const { item } = req.body;

    const redirectURL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://www.smartreportz.com/';

    const transformedItem = {
        price_data: {
            currency: 'usd',
            product_data: {
                images: [item.image],
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        description: item.description,
        quantity: item.quantity,
    };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: redirectURL + '?status=success',
        cancel_url: redirectURL + '?status=cancel',
        metadata: {
            images: item.image,
        },
    });

    res.json({ id: session.id });
}

export default CreateStripeSession;