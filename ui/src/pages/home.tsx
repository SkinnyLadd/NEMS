import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to the Home Page</CardTitle>
                    <CardDescription>This is a simple example using the Card component.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Here you can add any content you like. Customize it as needed!</p>
                </CardContent>
                <CardFooter>
                    <button className="
                    bg-gray-800
                    text-gray-500 px-4 py-2 rounded">
                        Get Started</button>
                </CardFooter>
            </Card>
        </div>
    );
}