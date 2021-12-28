const stripe = require('stripe')('sk_test_51Ja2zYI8lb3K90427bEmBf22IPXO9c69eT6bsAvzUWg6cjQOoEjs1aRmF8EWDYGyhVcGipppbRFtUCPunbOpHyt100VaaNw6ER');

async function CreateStripeSession(req, res) {
    const { name, description, image, quantity, price, licenceId } = req.body;
    console.log(name, description, image, quantity, price)
    const redirectURL =
        process.env.NODE_ENV === 'development'
            ? `http://localhost:3000/checkout/${licenceId}`
            : `https://www.smartreportz.com/checkout/${licenceId}`;

    const transformedItem = {
        price_data: {
            currency: 'usd',
            product_data: {
                images: [],
                name: name,
            },
            unit_amount: price * 100,
        },
        description: description,
        quantity: quantity,
    };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: redirectURL + '?status=success',
        cancel_url: redirectURL + '?status=cancel',
        metadata: {
            images: [],
        },
    });
    console.log(session)
    res.json({ id: session.id });
}

export default CreateStripeSession;