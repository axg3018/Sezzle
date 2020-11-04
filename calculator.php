<?php include "db.inc"; 

    
    
    $calculation = $_POST["equation"];
    $calculation= str_replace(' ', '+', $calculation);
    

    $db = new CalculatorDB();
    if (!$db) {
        echo $db->lastErrorMsg();
    }

    $sql = "INSERT INTO History(Equation) VALUES ('$calculation')";
    $db->query($sql);

    $sql = "SELECT COUNT(*) as count FROM History";
    $result = $db->query($sql);
    $row = $result->fetchArray(SQLITE3_ASSOC);
    $count = $row['count'];
    //echo $count;
    
    if($count > 10){
        $sql = "DELETE FROM History WHERE ID = (SELECT ID FROM History LIMIT 1)";
        $db->query($sql);
    }

    
    $db->close();
?>