import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-md w-100">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-3 rounded"
          required
        />
        <Button type="submit" size={"cv"} className={"w-full"}>
          Login
        </Button>
      </form>
    </div>
  );
}
