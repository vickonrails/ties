import { useRouter } from "next/router";

export function useRefreshData() {
    const { replace, asPath } = useRouter()

    const refreshData = () => {
        replace(asPath);
    }

    return [refreshData]
}