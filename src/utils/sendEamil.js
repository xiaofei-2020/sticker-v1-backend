const nodemailer = require('nodemailer');

module.exports = async (userEmailAdress, verifyCode, type, expiresTime) => {
  let transport = {
    host: 'smtp.qq.com',
    service: 'QQ', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: 'sticker_serve@qq.com',
      pass: 'wponhpdzismvjcfa',
    }
  };
  let transporter = nodemailer.createTransport(transport);


  let mailOptions = {
    from: '"Sticker Service" <sticker_serve@qq.com>',
    to: userEmailAdress,
    subject: 'Verify Code',
    text: `您正在进行<span style="color: red">${type === 'REGIST' ? '注册账号' : '修改账号密码'}</span>操作，
    请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${verifyCode}</span>，以完成操作。`,
    html: `
    <table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
      <tbody>
      <tr>
        <td>
            <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                <tbody><tr><td width="210"></td></tr></tbody>
              </table>
            </div>
            <div style="width:680px;padding:0 10px;margin:0 auto;">
              <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong>
                <strong style="display:block;margin-bottom:15px;">
                  您正在进行<span style="color: red">${type === 'REGIST' ? '注册账号' : '修改账号密码'}</span>操作，
                  请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${verifyCode}</span>，以完成操作。
                </strong>
                <strong style="display:block;margin-bottom:15px;">
                  5 分钟内输入有效。
                </strong>
              </div>
              <div style="margin-bottom:30px;">
                <small style="display:block;margin-bottom:20px;font-size:12px;">
                  <p style="color:#747474;">注意：此操作可能会修改您的密码、登录邮箱。如非本人操作，请及时登录并修改密码以保证帐户安全<br>
                    （工作人员不会向你索取此验证码，请勿泄漏！）
                  </p>
                </small>
              </div>
            </div>
            <div style="width:700px;margin:0 auto;">
              <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                <p>此为系统邮件，请勿回复<br>请保管好您的邮箱，避免账号被他人盗用</p>
                <p>Sticker Service Team</p>
              </div>
            </div>
        </td>
      </tr>
      </tbody>
    </table>`
  };

  try {
    let result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log('sentEamil: ', err);
    throw err;
  }
};