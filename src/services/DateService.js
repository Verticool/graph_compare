import { useHttp } from '../hooks/http.hook';

const useDateService = () => {
    const { request } = useHttp();

    const getDate = async () => {
        const res = await request(`https://dpg.gg/test/calendar.json`);
        return res
    }
    return { getDate }
}

export default useDateService;