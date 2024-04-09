export const formatCurrency = (angka) => {
  if (!angka) return "Rp. 0";
  return `Rp. ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
