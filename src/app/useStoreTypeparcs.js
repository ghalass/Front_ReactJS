
import { create } from 'zustand'
import axiosClient from "../axiosClient";

const useStoreTypeparcs = create((set) => ({
    typeparcs: [],
    isProcessing: false,
    isLoading: false,
    error: null,
    errors: {},
    // Actions
    getTypeparcs: async () => {
        set({ isLoading: true, error: null }); // Start loading and reset error
        try {
            await axiosClient
                .get("/typeparcs", {})
                .then((res) => {
                    const typeparcs = res.data;
                    set({ typeparcs, isLoading: false }); // Update state with fetched data
                })
                .catch((err) => {
                    set({ error: err.message, isLoading: false }); // Handle error
                })
                .finally(() => {
                    set({ isLoading: false });
                });
        } catch (err) {
            set({ error: err.message, isLoading: false }); // Handle error
        }
    },
    createTypeparc: async (formData) => {
        set({ isProcessing: true, error: null }); // Start loading and reset error
        try {
            await axiosClient
                .post("/typeparcs", formData)
                .then((res) => {
                    // console.log(res);

                    // console.log(res?.data.typeparc);
                    // set({ typeparcs, isProcessing: false }); // Update state with fetched data
                })
                .catch((err) => {
                    console.log(err);
                    // console.log(err.response.data.message);

                    if (err.status == 422) {
                        // console.log("422");
                        // console.log(err.response.data.errors);

                        set({ errors: err.response.data.errors });
                    } else {
                        set({ error: err.message }); // Handle error
                    }
                })
                .finally(() => {
                    set({ isProcessing: false });
                });
        } catch (err) {
            set({ error: err.message, isProcessing: false }); // Handle error
        }

    }
}))

export default useStoreTypeparcs;
