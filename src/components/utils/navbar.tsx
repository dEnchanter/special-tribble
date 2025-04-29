"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MaxWidthWrapper } from "./max-width-wrapper";
import { buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitialsFromNames } from '@/lib/utils'
import { clearAccessToken, clearUserData, clearUserRoleDetail } from '@/utils/storage'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard-overview', current: false },
  { name: 'Raw Items', href: '/items-management', current: false },
  { name: 'Material Request', href: '/material-request', current: false },
  // { name: 'Items in Production', href: '/production', current: false },
  // { name: 'Product', href: '/product-management', current: false },
  { name: 'Users', href: '/user-management', current: false },
  { name: 'Invoices', href: '/invoice-management', current: false },
  { name: 'Settings', href: '/settings', current: false },
]

const userNavigation = [
  { name: 'Change Password', href: '/change-password' },
  { name: 'Sign out', href: '#' },
]

export const Navbar = () => {
  const user = false;

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between text-xl">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-brand-700">April</span>
            <span className="italic">Wind</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Dashboard <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </>
            ) : (
              <>
                <div className="h-8 w-px bg-gray-200" />

                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  Sign in <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export const DashboardNav = () => {

  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path

  // Update the `current` property based on the pathname
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: pathname === item.href, // Set the current flag for active link
  }));

  const handleSignOut = () => {
    clearAccessToken();
    clearUserData();
    clearUserRoleDetail();
    router.replace('/');
  };

  return (
    <Disclosure as="header" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
            <Link href="/" className="flex z-40 font-medium bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
              <span className="">April</span>
              <span className="italic">Wind</span>
            </Link>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="grid w-full grid-cols-1 sm:max-w-xs">
              <input
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                disabled
                className="col-start-1 row-start-1 block w-full rounded-md bg-gray-700 py-1.5 pl-10 pr-3 text-base text-white outline-none placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm/6"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
              />
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            <button
              type="button"
              className="relative shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {getInitialsFromNames("A", "D")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:flex lg:items-center">
                  <div className="flex flex-col items-start justify-center">
                    <span className="ml-4 text-sm font-semibold leading-6 text-zinc-200" aria-hidden="true">
                      {"Aomine Diki"}
                    </span>
                    <span className="ml-4 text-xs font-normal text-zinc-200">
                      Admin
                    </span>
                  </div>
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <li
                          onClick={() => item.name === 'Sign out' ? handleSignOut() : router.push(item.href)}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-[.8rem] font-medium leading-6 text-gray-900 cursor-pointer'
                          )}
                        >
                          {item.name}
                        </li>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

         {/* Desktop Navigation */}
        <nav aria-label="Global" className="hidden lg:flex lg:space-x-8 lg:py-2">
          {updatedNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {updatedNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              {/* <img alt="" src={user.imageUrl} className="size-10 rounded-full" /> */}
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">{user.name}</div>
              <div className="text-sm font-medium text-gray-400">{user.email}</div>
            </div>
            <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}