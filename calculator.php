<?php include "db.inc"; 

    $key = array_keys($_POST)[0];
    
    $value = $_POST[$key];
    $key = str_replace('_', '+', $key);
    $calculation = $key."=".$value;

    //echo $calculation;

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

    $fetch = "SELECT * FROM History ORDER BY ID DESC";
    $results = $db->query($fetch);
    $table = "";
    while($row = $results->fetchArray(SQLITE3_ASSOC) ) {
        $table .= "<tr><td>".$row["Equation"]."</td></tr>";
    }
    echo $table;    
    $db->close();
?>