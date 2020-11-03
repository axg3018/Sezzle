<?php include "db.inc"; 

    
    $db = new CalculatorDB();
    if (!$db) {
        echo $db->lastErrorMsg();
    }

    


    $fetch = "SELECT * FROM History ORDER BY ID DESC";
    $results = $db->query($fetch);
    $table = "";
    while($row = $results->fetchArray(SQLITE3_ASSOC) ) {
        $table .= "<tr><td>".$row["Equation"]."</td></tr>";
    }
    
    $db->close();
    echo $table;
    
?>