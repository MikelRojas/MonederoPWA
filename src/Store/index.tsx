/**
 * Guarda el ID del cliente en el sessionStorage.
 *
 * Si el ID es nulo, se guarda como "any".
 *
 * @param {number | null} id - El ID del cliente a guardar.
 */
export const saveIdClient = (id: number | null) => {
    sessionStorage.setItem('nodeId', id !== null ? id.toString() : "any")
  };


/**
 * Guarda el estado de visibilidad del escáner en el sessionStorage.
 *
 * Si el estado es nulo, se guarda como 'false'.
 *
 * @param {boolean} state - El estado de visibilidad del escáner.
 */
export const saveShowScan = (state: boolean) => {
  sessionStorage.setItem('showScan', state !== null ? state.toString() : 'false')
};
 
/**
 * Recupera el ID del cliente desde el sessionStorage.
 *
 * Si el ID no está presente o es "any", se retorna null.
 *
 * @returns {number | null} El ID del cliente, o null si no está presente.
 */
export const getIdClient = () => {
    const id = sessionStorage.getItem('nodeId');
    if (id === null || id === "any") {
      return null; 
    }
    return parseInt(id, 10); 
};
  
/**
 * Recupera el estado de visibilidad del escáner desde el sessionStorage.
 *
 * @returns {boolean} true si el escáner debe mostrarse, false en caso contrario.
 */
export const getShowScan = (): boolean => {
  const state = sessionStorage.getItem('showScan');
  return state?.toLowerCase() === 'true' || false;
};
