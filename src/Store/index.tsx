export const saveIdClient = (id: number | null) => {
    sessionStorage.setItem('nodeId', id !== null ? id.toString() : "any")
  };

export const saveShowScan = (state: boolean) => {
  sessionStorage.setItem('showScan', state !== null ? state.toString() : 'false')
};
  
export const getIdClient = () => {
    const id = sessionStorage.getItem('nodeId');
    if (id === null || id === "any") {
      return null; 
    }
    return parseInt(id, 10); 
};
  
export const getShowScan = (): boolean => {
  const state = sessionStorage.getItem('showScan');
  // Verifica si el valor es 'true' (sin importar mayúsculas)
  return state?.toLowerCase() === 'true' || false;
};
