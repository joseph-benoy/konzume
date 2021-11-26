<?php
class Database{
    protected $connection = null;
    public function __construct(){
        try{
            $this->connection = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_DATABASE_NAME);
            if(mysqli_connect_errno()){
                throw new Exception("couldn't connect to database");
            }
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
    public function insert($query,$params,$typeString){
        try{
            $statement = $this->executeStatement($query,$params,$typeString);
            $statement->close();
            if($statement->error==null){
                return true;
            }
            else{
                return $statement;
            }
            return $statement;
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
    public function executeStatement($query,$params,$typeString){
        try{
            $statement = $this->connection->prepare($query);
            if($statement==false){
                throw New Exception("Unable to do prepared statement: (preparation error) " . $query);
            }
            else{
                if($params){
                    if(!($statement->bind_param($typeString,...$params))){
                        throw New Exception("Unable to do prepared statement(bind error): ".$query);
                    }
                    if(!($statement->execute())){
                        throw New Exception("Unable to do prepared statement(execution error): ".$query);
                    }
                }
            }
            return $statement;
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
    public function insertEnc($query = "",$params = [],$typeString){
        try{
            $statement = $this->executeStatement($query,$params,$typeString);
            $statement->close();
            return result;
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
}                    