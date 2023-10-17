import restRequest from '@/utils/restRequest';

export const removeApi = <Res>(id: string) => {
    return restRequest<Res>({
        url: '/api/remove',
        data: { id },
        method: 'DELETE',
    });
};