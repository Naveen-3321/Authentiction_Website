export default function UserProfile({ params }: any) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>Profile Page</h1> <hr />
      <span className="bg-orange-500 rounded">
        <p className="text-white">Profile:{params.id}</p>
      </span>
    </div>
  );
}
