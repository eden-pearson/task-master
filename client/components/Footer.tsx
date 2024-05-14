export default function Footer() {
  return (
    <div className="p-4 bg-white text-center">
      <div className="flex flex-row gap-6 justify-center">
        <a href="https://github.com/eden-pearson">
          <i className="fa-brands fa-github fa-xl"></i>
          <p className="sr-only">github profile</p>
        </a>
        <a href="mailto:pearsoneden@gmail.com">
          <i className="fa-regular fa-envelope fa-xl"></i>
          <p className="sr-only">email address</p>
        </a>
      </div>
      <div className="mt-4 text-gray-600">
        © 2024 Eden Pearson. All rights reserved.
      </div>
    </div>
  )
}
