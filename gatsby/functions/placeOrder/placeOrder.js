const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
    return `<div>
    <h2>
        <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
        <ul>
            ${order.map(item => `<li>
                <img src="${item.thumbnail}" alt="${item.name}"/>
                ${item.size} ${item.name } - ${item.price}
                </li>`).join('')}
        </ul>
        <p>Your Total is <strong>$${total}</strong> due at pickup</p>
        <style>
        ul {
            list-style: none;
        }
        </style>
    </h2></div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

// aws lambda function signature for Netlify
exports.handler = async (event, context) => {
    await wait(5000);
    // for Vercel would be: const { body } = req; with no JSON business
    const body = JSON.parse(event.body);
    // Check if they have fille dout the honeypot
    if(body.mapleSyrup) {
      // for Vercel:
      // res.status(400).json({ message: 'message text'})
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Boop beep bop zzstt good bye ERROR 3003'}),
        };
    }
    // Validate the data coming in is correct
    const requiredFields = ['email', 'name', 'order'];
  
      if (!body.order.length) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `Why would you order nothing?!`,
          }),
        };
    }

    // make sure they actually have items in that order



  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success'}),
  };
};