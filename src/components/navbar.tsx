import { Button } from "@heroui/button";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { TbRibbonHealth } from "react-icons/tb";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Link } from "react-router-dom";

import Logo from "/logo.svg";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeroUINavbar
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile Layout */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand>
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            to="/"
          >
            <img alt="Logo" className="w-20" src={Logo} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Desktop Layout */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-1/4"
        justify="start"
      >
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            to="/"
          >
            <img alt="Logo" className="w-20" src={Logo} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex basis-1/2 mt-2" justify="center">
        <div className="flex gap-4 justify-center">
          {siteConfig.navItems.slice(0, 3).map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium hover:text-primary"
                )}
                color="foreground"
                to={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-1/4"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2" />
        <NavbarItem className="hidden md:flex mt-3">
          <div className="flex gap-2">
            <Link to="/login">
              <Button
                className="text-sm font-normal text-default-600 bg-default-100/70 hover:bg-default-200/70 backdrop-blur-sm"
                variant="flat"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="text-sm font-normal text-white0 bg-primary"
                variant="shadow"
              >
                Join Fitflo <TbRibbonHealth className="stroke-[2.5px]" />
              </Button>
            </Link>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white/70 backdrop-blur-sm">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                to={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
