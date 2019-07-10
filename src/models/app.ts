/**
 * holds current app state which is used for several components
 */
export interface AppState {
    currentLevel: number;       // current view layer
    sideMenuOpen: boolean;      // state of sidemenu
    topologyLoading: boolean;   // topology loading process running
    topologyLoaded: boolean;    // topology loaded yes -> no
    initComplete: boolean;      // set to true if topology and every other mapping is loaded
}
