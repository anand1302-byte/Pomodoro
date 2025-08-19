'use client'

export default function ArticleContent({ isDarkMode }) {
  return (
    <div className={`card shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode ? 'bg-black border-gray-500' : 'bg-white border-gray-200'
    }`}>
      <article className="prose max-w-none">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Boost Your Productivity with the Pomodoro Technique
          </h1>
          <div className={`text-sm mb-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Last updated: June 2023 | 8 min read
          </div>
          
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
              alt="Pomodoro timer and notebook on desk"
              className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              loading="lazy"
            />
            <p className={`text-sm mt-2 text-center ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              The Pomodoro Technique helps you work in focused bursts
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            In a world full of distractions, staying focused feels like a superpower. Enter the Pomodoro Technique, 
            a simple yet powerful time management method that can transform how you work, study, or tackle tasks. 
            Whether you're a student cramming for exams, a professional juggling deadlines, or someone just trying 
            to get through a to-do list, this technique could be your secret weapon.
          </p>

          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            What Is the Pomodoro Technique?
          </h2>

          <div className="flex justify-center mb-6">
            <div className="max-w-sm">
              <img
                src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Tomato-shaped kitchen timer"
                className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                loading="lazy"
              />
              <p className={`text-sm mt-2 text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                The original Pomodoro timer that inspired the technique
              </p>
            </div>
          </div>

          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Developed in the 1980s by Francesco Cirillo, the Pomodoro Technique is named after the tomato-shaped 
            kitchen timer he used as a student (in Italian, "pomodoro" means tomato). The idea is simple: break 
            your work into focused intervals, typically 25 minutes long, followed by short breaks. These intervals 
            are called "Pomodoros." After four Pomodoros, you take a longer break to recharge.
          </p>

          <div className={`p-6 rounded-xl border-l-4 border-blue-500 shadow-sm ${
            isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Standard Pomodoro Structure
            </h4>
            <ul className={`list-disc list-inside space-y-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <li>25 minutes of focused work</li>
              <li>5-minute break</li>
              <li>Repeat four times, then take a 15-30 minute break</li>
            </ul>
          </div>

          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Does It Work?
          </h2>
          
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            The Pomodoro Technique taps into how our brains function. Here's why it's so effective:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                1. Fights Procrastination
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                The short 25-minute commitment feels less intimidating than staring down hours of work, 
                making it easier to start.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                2. Boosts Focus
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                By working in distraction-free bursts, you train your brain to stay on task.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                3. Prevents Burnout
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Regular breaks keep your mind fresh, reducing mental fatigue.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                4. Builds Momentum
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Completing Pomodoros feels rewarding, motivating you to keep going.
              </p>
            </div>
          </div>

          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How to Use the Pomodoro Technique
          </h2>
          
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Ready to give it a try? Follow these steps to get started:
          </p>

          <div className="space-y-4">
            {[
              { title: "Step 1: Choose a Task", desc: "Pick something you want to work on—writing, studying, coding, or even household chores." },
              { title: "Step 2: Set a Timer", desc: "Use a kitchen timer, phone app, or online tool to set a 25-minute countdown." },
              { title: "Step 3: Work Without Distractions", desc: "Focus solely on your task. Silence notifications, close unrelated tabs, and stay committed." },
              { title: "Step 4: Take a 5-Minute Break", desc: "Step away, stretch, grab a drink, or do something relaxing (avoid scrolling social media—it can derail your focus)." },
              { title: "Step 5: Repeat and Rest", desc: "After four Pomodoros, take a longer break (15-30 minutes) to recharge." }
            ].map((step, index) => (
              <div key={index}>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className={`p-6 rounded-xl border-l-4 border-green-500 shadow-sm ${
            isDarkMode ? 'bg-gray-800' : 'bg-green-50'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Pro Tip
            </h4>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Track completed Pomodoros to build a sense of accomplishment. Many people find they get more done 
              in 4 focused Pomodoros (2 hours) than in 4 hours of distracted work.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}