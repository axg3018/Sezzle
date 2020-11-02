<?php
    $equation = array_keys($_POST)[0];
    $myArray = str_split($equation);

    
    $operants = array();
    
    $operations = array();
    $str = "";

    foreach($myArray as $character){
        
        if ($character === '_' || $character === '-' || $character === '*' || $character === '/'){
            array_push($operants, $str);
            array_push($operations, $character);
            $str = "";
        }
        else{
            $str .= $character;
        }
    }
    array_push($operants, $str);


    var_dump($operants);
?>