<?php 
    class CalculatorDB extends SQLite3 {
        function __construct() {
            $this->open('calculator.db');
        }
    }
?>