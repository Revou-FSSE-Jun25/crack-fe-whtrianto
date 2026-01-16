export const formatRupiah = (amount: number): string => {
    const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return formatted.replace("Rp", "Rp.");
};
