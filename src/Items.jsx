import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Items() {
  const queryClient = useQueryClient();

  const fetchItems = async () => {
    const response = await fetch('http://localhost:4000/items');
    return response.json();
  };

  const addNewItem = async () => {
    const response = await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: 'New Item',
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

  const mutation = useMutation({
    mutationFn: addNewItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Items</h1>
      <button
        onClick={() => {
          mutation.mutate();
        }}
      >
        Add New Item
      </button>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
