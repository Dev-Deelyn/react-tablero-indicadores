
export type NumberFormat =
    | "integer"
    | "decimal"
    | "percent"
    | "percent-decimal"
    | "scientific";

export interface NumberFormatProps {
    // ─── Formato de números ───────────────────────────────────
    /** Formato predefinido para los valores. Default: "decimal" */
    numberFormat?: NumberFormat;
    /** Cantidad de decimales. Sobrescribe el default del formato elegido */
    decimals?: number;
    /** Prefijo para los valores. Ej: "$", "USD " */
    numberPrefix?: string;
    /** Sufijo para los valores. Ej: " M", " MILES", " K" */
    numberSuffix?: string;
    /**
     * Formateador personalizado. Si se provee, ignora todas las demás props
     * de formato y usa esta función directamente.
     * Ej: (v) => `${(v / 1000).toFixed(1)} M`
     */
    valueFormatter?: (value: number) => string;
}

/**
 * Construye una función formateadora a partir de las props de formato.
 * Si se provee valueFormatter, lo usa directamente.
 * Si no, construye uno a partir de numberFormat, decimals, prefix y suffix.
 *
 * @param props Props de formato
 */
export const buildFormatter = (props: NumberFormatProps): (value: number) => string => {
    const {
        numberFormat = "decimal",
        decimals,
        numberPrefix = "",
        numberSuffix = "",
        valueFormatter,
    } = props;

    if (valueFormatter) return valueFormatter;

    return (value: number): string => {
        if (value === null || value === undefined) return "—";

        let formatted: string;

        switch (numberFormat) {
            case "integer":
                formatted = Math.round(value).toLocaleString("es-AR", {
                    maximumFractionDigits: 0,
                });
                break;

            case "decimal": {
                const dec = decimals ?? 2;
                formatted = value.toLocaleString("es-AR", {
                    minimumFractionDigits: dec,
                    maximumFractionDigits: dec,
                });
                break;
            }

            case "percent": {
                const dec = decimals ?? 0;
                // Multiplica por 100 para convertir 0.135 → 13%
                formatted = (value * 100).toLocaleString("es-AR", {
                    minimumFractionDigits: dec,
                    maximumFractionDigits: dec,
                }) + "%";
                break;
            }

            case "percent-decimal": {
                const dec = decimals ?? 2;
                formatted = (value * 100).toLocaleString("es-AR", {
                    minimumFractionDigits: dec,
                    maximumFractionDigits: dec,
                }) + "%";
                break;
            }

            case "scientific": {
                const dec = decimals ?? 2;
                formatted = value.toExponential(dec).replace("e+", "E").replace("e-", "E-");
                break;
            }

            default:
                formatted = value.toLocaleString("es-AR");
        }

        return `${numberPrefix}${formatted}${numberSuffix}`;
    };
};