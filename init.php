<?php include "db.inc"; 
    // The Calculator database
   
    
 
    // Instantiate the Calculator database
    $db = new CalculatorDB();
    if (!$db) {
        echo $db->lastErrorMsg();
    }
 
    // Populate the Users database
    $sql =<<<EOF
        DROP TABLE IF EXISTS History;
        CREATE TABLE History (
            ID INTEGER PRIMARY KEY,
            Equation VARCHAR(100)
        );
              
EOF;

    // Create the table
    $db->query($sql);
    $db->close();
    echo "wrote database";
?>