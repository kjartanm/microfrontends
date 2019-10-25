import { readable, derived } from 'svelte/store';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const _profile  = {
    email: 'margheritadoughstone@pizzafan.com',
    name: 'Margherita Doughstone',
    address: {
        street: 'Cheesy Avenue',
        streetnumber: '101',
        city: 'Tipo',
        postcode: '0000'
    },
    payment: {
        cardprovider: 'Calzone',
        cardnumber: 'xxxx-xxxx-xxxx-0001',
        expirydate: 'July 2022',
        cvs: '123'
    }
};

const sillyFetch = async _customerid => {
    await sleep(250);
    return _profile;
}

export const customerid = readable(null, async set => {
    const Module = await import('./kernel');
    const _customerid = Module.getSharedKernel('customerid');
    if (_customerid != null) {
        set(_customerid);
    }
    Module.onKernelKey('change:customerid', _customerid => {
        set(_customerid);
    });
    return () => Module.offKernelKey('change:customerid');
});

export const profile = derived(
    customerid,
    async ($customerid, set) => {
        //here  we could add api calls for profile, for now faking it
        if($customerid != null){
            const _customerProfile = await sillyFetch($customerid);
            set(_customerProfile);
        }
    }, null
);