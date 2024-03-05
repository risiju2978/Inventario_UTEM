DELIMITER //

CREATE PROCEDURE Read_v_infogenerator()
BEGIN
    SELECT * FROM v_infogenerator;
END //

DELIMITER ;

CALL Read_v_infogenerator();
