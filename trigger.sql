CREATE OR REPLACE FUNCTION set_non_premium_account() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO NONPREMIUM (email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_non_premium_account
AFTER INSERT ON AKUN
FOR EACH ROW
EXECUTE FUNCTION set_non_premium_account();

-- cek email
CREATE OR REPLACE FUNCTION check_email() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Email tidak valid';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_email
BEFORE INSERT OR UPDATE ON AKUN
FOR EACH ROW
EXECUTE FUNCTION check_email();

CREATE TRIGGER check_email
BEFORE INSERT OR UPDATE ON LABEL
FOR EACH ROW
EXECUTE FUNCTION check_email();

-- DURASI PODCAST DI UPDATE SETIAP EPISODE DIBUAT

CREATE OR REPLACE FUNCTION set_podcast_duration() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE KONTEN
        SET durasi = durasi + NEW.durasi
        WHERE id = NEW.id_konten_podcast;
        RETURN NEW;
    ELSE
        UPDATE KONTEN
        SET durasi = durasi - OLD.durasi
        WHERE id = OLD.id_konten_podcast;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_podcast_duration
AFTER INSERT OR DELETE ON EPISODE
FOR EACH ROW
EXECUTE FUNCTION set_podcast_duration();

-- UPDATE TOTAL PLAY

CREATE OR REPLACE FUNCTION set_total_play() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE SONG
        SET total_play = total_play + 1
        WHERE id_konten = NEW.id_song;
        RETURN NEW;
    ELSE
        UPDATE SONG
        SET total_play = total_play - 1
        WHERE id_konten = OLD.id_song;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_total_play
AFTER INSERT OR DELETE ON PLAYLIST_SONG
FOR EACH ROW
EXECUTE FUNCTION set_total_play();

-- UPDATE TOTAL DOWNLOAD
CREATE OR REPLACE FUNCTION set_total_download() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE SONG
        SET total_download = total_download + 1
        WHERE id_konten = NEW.id_song;
        RETURN NEW;
    ELSE
        UPDATE SONG
        SET total_download = total_download - 1
        WHERE id_konten = OLD.id_song;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_total_download
AFTER INSERT OR DELETE ON DOWNLOADED_SONG
FOR EACH ROW
EXECUTE FUNCTION set_total_download();