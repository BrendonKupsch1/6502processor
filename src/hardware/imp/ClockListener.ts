export interface CloockListener {
    // Notify all clock attached hardware when a pulse occurs
    pulse() : void;
}