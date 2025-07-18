import { Link } from 'react-router-dom';
import { MessageCircle, Bot, Lock, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-white font-sans overflow-x-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>


            <header className="absolute top-0 left-0 right-0 p-4 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-8 w-8 text-cyan-400" />
                        <span className="text-xl font-bold tracking-wider">NexusChat</span>
                    </div>
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm font-semibold border border-cyan-400 rounded-md hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 pt-32 pb-16 text-center flex flex-col items-center">
                <section className="w-full max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 leading-tight">
                        The Future of Conversation is Here
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Engage in fluid, real-time conversations with advanced AI personas. Experience the next generation of chat, built for developers, creators, and innovators.
                    </p>
                    <Link
                        to="/login"
                        className="mt-10 inline-block px-8 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] transition-all duration-300 transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                </section>

                <section className="mt-24 w-full">
                    <div className="relative max-w-5xl mx-auto p-1.5 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 shadow-2xl shadow-cyan-500/20">
                        <img
                            src="https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Person interacting with a futuristic AI interface"
                            className="rounded-lg w-full h-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src='https://placehold.co/1200x675/0a0a0a/e0e0e0?text=App+Preview+Not+Available';
                            }}
                        />
                    </div>
                </section>

                <section className="mt-24 w-full max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tight">Built for a Modern Web</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-center">
                            <Zap className="h-10 w-10 mx-auto text-cyan-400 mb-4" />
                            <h3 className="text-xl font-semibold">Real-Time Chat</h3>
                            <p className="mt-2 text-gray-400">Powered by WebSockets for instant message delivery without delay.</p>
                        </div>
                        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-center">
                            <Bot className="h-10 w-10 mx-auto text-cyan-400 mb-4" />
                            <h3 className="text-xl font-semibold">Intelligent AI Personas</h3>
                            <p className="mt-2 text-gray-400">Converse with unique AI personalities designed to assist and inspire.</p>
                        </div>
                        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-center">
                            <Lock className="h-10 w-10 mx-auto text-cyan-400 mb-4" />
                            <h3 className="text-xl font-semibold">Secure & Private</h3>
                            <p className="mt-2 text-gray-400">Your conversations are protected with modern authentication standards.</p>
                        </div>
                    </div>
                </section>
            </main>


            <footer className="border-t border-gray-800 mt-20 py-6">
                <div className="container mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Thirstypooch. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
