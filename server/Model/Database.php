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
    public function insert($tableName,$params = [],$typeString,$columnList = null){
        try{
            $insert_query = null;
            if($columnList==null){
                $insert_query = "INSERT INTO {$tableName} VALUES(";
                $no_of_values = count($params);
                for($i=1;$i<=$no_of_values;$i++){
                    $insert_query.="?";
                    if($i<$no_of_values){
                        $insert_query.=",";
                    }
                }
                $insert_query.=")";
            }
            $statement = $this->executeStatement($insert_query,$params,$typeString);
            $result = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
            $statement->close();
            return result;
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
    public function executeStatement($query = "",$params = [],$typeString){
        try{
            $statement = $this->connection->prepare($query);
            if($statement==false){
                throw New Exception("Unable to do prepared statement: " . $query);
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
}                    