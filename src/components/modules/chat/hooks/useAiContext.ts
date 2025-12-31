const useAiContext = () => {
  const context = "dummy context"; // Replace with actual context retrieval logic

  return {
    context,
  };
};
export default useAiContext;

export type UseAiContextReturn = ReturnType<typeof useAiContext>;
