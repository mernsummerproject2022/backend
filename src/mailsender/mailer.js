import nodemailer from 'nodemailer';
import { appEmail } from '../util/constants';

const mailer = (event, invite) => {
  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: appEmail.address,
      pass: appEmail.password
  }
  });

  const mailOptions = {
    from: appEmail.address,
    to: invite.user.email,
    subject: `New invitation from ${event.owner.email}.`,
    html: `<div>
    <table style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  width: 100%;">
        <tr>
            <td>
                <h1 style="text-align:center;">You have been invited to a sport event!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding-left: 20px; ">
                <h2 style="margin: 2px; font-weight: lighter;"><span
                        style="color:#414141; font-weight: bold;">Event:
                    </span>${event.name}</h2>
            </td>
        </tr>
        <tr>
            <td style="padding-left: 20px;">
                <h2 style="margin: 2px; font-weight: lighter;">${event.description}</h2>
            </td>
        </tr>
        <tr>
            <td style="padding-left: 20px;">
                <h2 style="margin: 2px; font-weight: lighter;"><span style="color:#414141; font-weight: bold;">Date
                        &
                        time: </span>${event.dateTime.toLocaleDateString() + " at " + event.dateTime.toTimeString()}</h2>
            </td>
        </tr>
        <tr>
            <td style="padding-left: 20px;">
                <h2 style="margin: 2px; font-weight: lighter;"><span
                        style="color:#414141; font-weight: bold;">Location:
                    </span>${event.location.name}
                </h2>
            </td>
        </tr>
        <tr>
            <td style="padding-left: 20px;">
                <h3 style="margin-top: 30px; margin-bottom: 0;  color:#414141;">Please response to this
                    invitation before ${event.deadline.toLocaleDateString() + " at " + event.deadline.toTimeString()}</h3>
            </td>
        </tr>
        <tr>
            <td style="padding-left: 20px;">
                <h3 style="margin: 0;"><span style="color:#414141; font-weight: lighter;">You have been invited
                        to this event by
                        ${event.owner.email}</span></h3>
            </td>
        </tr>
    </table>
    <table style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width: 100%; margin-top: 40px;">
        <tr>
            <td style="background-color:black; width: 100px; text-align:center; padding: 10px;">
                <a href="${appEmail.linkURL}/accept/${event._id}/${invite._id}" target="_blank"
                    style="color: white; text-decoration: none; font-weight:bold; width: 100px;">
                    Accept
                </a>
            </td>
            <td style="background-color:black; width: 100px; text-align:center; padding: 10px;">
                <a href="${appEmail.linkURL}/decline/${event._id}/${invite._id}" target="_blank"
                    style="color: white; text-decoration: none; font-weight:bold; width: 100px;">
                    Decline
                </a>
            </td>
        </tr>
    </table>
</div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
};

export default mailer;
