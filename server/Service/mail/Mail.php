<?php
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception; 
class Mail{
    protected $mail;
    public function __construct(){
        $this->mail = new PHPMailer;
        $this->mail->isSMTP();                      // Set mailer to use SMTP 
        $this->mail->Host = 'smtp.gmail.com';       // Specify main and backup SMTP servers 
        $this->mail->SMTPAuth = true;               // Enable SMTP authentication 
        $this->mail->Username = 'josephbenoy03@gmail.com';   // SMTP username 
        $this->mail->Password = 'jesuschrist3057';   // SMTP password 
        $this->mail->SMTPSecure = 'tls';            // Enable TLS encryption, `ssl` also accepted 
        $this->mail->Port = 587; 
    }
    public function sendMail($mailto,$subject="",$bodyContent,$isHtml=true){
        try{
            $mail->setFrom('josephbenoy03@gmail.com', 'Konzume'); 
            $mail->addReplyTo('reply@konzume.com', 'Konzume'); 
            
            // Add a recipient 
            $mail->addAddress($mailto); 
            
            //$mail->addCC('cc@example.com'); 
            //$mail->addBCC('bcc@example.com'); 
            
            // Set email format to HTML 
            $mail->isHTML(isHtml); 
            
            // Mail subject 
            $mail->Subject = $subject; 
            
            // Mail body content 
            $mail->Body    = $bodyContent; 
            $this->mail->send();
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
}