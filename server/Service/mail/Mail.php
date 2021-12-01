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
        $this->mail->Username = '';   // SMTP username 
        $this->mail->Password = '';   // SMTP password 
        $this->mail->SMTPSecure = 'tls';            // Enable TLS encryption, `ssl` also accepted 
        $this->mail->Port = 587; 
    }
    public function sendMail($mailto,$subject="",$bodyContent,$isHtml=true){
        try{
            $this->mail->setFrom('josephbenoy03@gmail.com', 'Konzume'); 
            $this->mail->addReplyTo('reply@konzume.com', 'Konzume'); 
            
            // Add a recipient 
            $this->mail->addAddress($mailto); 
            
            //$mail->addCC('cc@example.com'); 
            //$mail->addBCC('bcc@example.com'); 
            
            // Set email format to HTML 
            $this->mail->isHTML(isHtml); 
            
            // Mail subject 
            $this->mail->Subject = $subject; 
            
            // Mail body content 
            $this->mail->Body    = $bodyContent; 
            if($this->mail->send()==1){
                return true;
            }            
            else{
                return false;
            }
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
    public function sendMailApp($mailto,$subject,$otp){
        //https://script.google.com/macros/s/AKfycbxpvnzRkq6Xy0gU-zy4U5brsrgNjQYE-At55h2zMuOqnKNGO2mDGq3_wFLkMIRYto7W/exec
        $ch = curl_init();  
        $url = "https://script.google.com/macros/s/AKfycbxpvnzRkq6Xy0gU-zy4U5brsrgNjQYE-At55h2zMuOqnKNGO2mDGq3_wFLkMIRYto7W/exec?email={$mailto}&subject={$subject}&otp={$otp}";
        curl_setopt($ch,CURLOPT_URL,$url);  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);        
        curl_setopt($ch,CURLOPT_HEADER, false);
        if(curl_exec($ch)){
            curl_close($ch);
            return true;
        }
        else{
            return false;
        }
    }
}