<?php include "db.inc"; 

    $key = array_keys($_POST)[0];
    $value = $_POST[$key];
    $calculation = $key."=".$value;
    //echo $calculation;

    $db = new CalculatorDB();
    if (!$db) {
        echo $db->lastErrorMsg();
    }

    $sql = "INSERT INTO History(Equation) VALUES ('$calculation')";
    $db->query($sql);

    $fetch = "SELECT * FROM History";
    $results = $db->query($fetch);
    while ($row = $results->fetchArray()) {
        var_dump($row);
    }
    $db->close();
?>