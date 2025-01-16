DELIMITER $$

CREATE TRIGGER after_reservation_insert
AFTER INSERT ON reservation
FOR EACH ROW
BEGIN
    DECLARE pubsub_topic STRING;
    SET pubsub_topic = 'projects/your-project-id/topics/notification_topics';

    CALL sp_publish_to_pubsub(pubsub_topic, JSON_OBJECT(
        'to', NEW.email,
        'subject', NEW.subject,
        'message', NEW.message
    ));
END$$

DELIMITER ;