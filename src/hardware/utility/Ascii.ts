export class Ascii {
    public static asciiCode(byte: number): string {
        if (byte == 0x41) {
            return "A";
        }
        else if (byte == 0x42) {
            return "B";
        }
        else if (byte == 0x43) {
            return "C";
        }
        else if (byte == 0x44) {
            return "D";
        }
        else if (byte == 0x45) {
            return "E";
        }
        else if (byte == 0x46) {
            return "F";
        }
        else if (byte == 0x47) {
            return "G";
        }
        else if (byte == 0x48) {
            return "H";
        }
        else if (byte == 0x49) {
            return "I";
        }
        else if (byte == 0x4A) {
            return "J";
        }
        else if (byte == 0x4B) {
            return "K";
        }
        else if (byte == 0x4C) {
            return "L";
        }
        else if (byte == 0x4D) {
            return "M";
        }
        else if (byte == 0x4E) {
            return "N";
        }
        else if (byte == 0x4F) {
            return "O";
        }
        else if (byte == 0x50) {
            return "P";
        }
        else if (byte == 0x51) {
            return "Q";
        }
        else if (byte == 0x52) {
            return "R";
        }
        else if (byte == 0x53) {
            return "S";
        }
        else if (byte == 0x54) {
            return "T";
        }
        else if (byte == 0x55) {
            return "U";
        }
        else if (byte == 0x56) {
            return "V";
        }
        else if (byte == 0x57) {
            return "W";
        }
        else if (byte == 0x58) {
            return "X";
        }
        else if (byte == 0x59) {
            return "Y";
        }
        else if (byte == 0x5A) {
            return "Z";
        }

        // numbers
        else if (byte == 0x30) {
            return "0";
        }
        else if (byte == 0x31) {
            return "1";
        }
        else if (byte == 0x32) {
            return "2";
        }
        else if (byte == 0x33) {
            return "3";
        }
        else if (byte == 0x34) {
            return "4";
        }
        else if (byte == 0x35) {
            return "5";
        }
        else if (byte == 0x36) {
            return "6";
        }
        else if (byte == 0x37) {
            return "7";
        }
        else if (byte == 0x38) {
            return "8";
        }
        else if (byte == 0x39) {
            return "9";
        }

        // special characters
        else if (byte == 0x20) {
            return " ";
        }
        else if (byte == 0x21) {
            return "!";
        }
        else if (byte == 0x22) {
            return "\"";
        }
        else if (byte == 0x23) {
            return "#";
        }
        else if (byte == 0x24) {
            return "$";
        }
        else if (byte == 0x25) {
            return "%";
        }
        else if (byte == 0x26) {
            return "&";
        }
        else if (byte == 0x27) {
            return "'";
        }
        else if (byte == 0x28) {
            return "(";
        }
        else if (byte == 0x29) {
            return ")";
        }
        else if (byte == 0x2A) {
            return "*";
        }
        else if (byte == 0x2B) {
            return "+";
        }
        else if (byte == 0x2C) {
            return ",";
        }
        else if (byte == 0x2D) {
            return "-";
        }
        else if (byte == 0x2E) {
            return ".";
        }
        else if (byte == 0x2F) {
            return "/";
        }
        else if (byte == 0x3A) {
            return ":";
        }
        else if (byte == 0x3B) {
            return ";";
        }
        else if (byte == 0x3C) {
            return "<";
        }
        else if (byte == 0x3D) {
            return "=";
        }
        else if (byte == 0x3E) {
            return ">";
        }
        else if (byte == 0x3F) {
            return "?";
        }
        else if (byte == 0x40) {
            return "@";
        }
        else if (byte == 0x5B) {
            return "[";
        }
        else if (byte == 0x5C) {
            return "\\";
        }
        else if (byte == 0x5D) {
            return "]";
        }
        else if (byte == 0x5E) {
            return "^";
        }
        else if (byte == 0x5F) {
            return "_";
        }
        else if (byte == 0x60) {
            return "`";
        }
        else if (byte == 0x7B) {
            return "{";
        }
        else if (byte == 0x7C) {
            return "|";
        }
        else if (byte == 0x7D) {
            return "}";
        }
        else if (byte == 0x7E) {
            return "~";
        }
    }
}